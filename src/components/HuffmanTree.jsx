"use client"

import { useEffect, useRef, useState, useCallback } from "react"
import * as d3 from "d3"

const PADDING = 100
const RADIUS = 10
const LABEL_SPACE = 10

export default function TreeVisualization({
    initialText = "banana",
    width: propWidth,
    height: propHeight,
}) {
    const svgRef = useRef(null)
    const [text, setText] = useState(initialText)
    const [treeData, setTreeData] = useState(null)
    const [codeMap, setCodeMap] = useState({})

    const width = propWidth || (typeof window !== "undefined" ? window.innerWidth - 20 : 800)
    const height = propHeight || (typeof window !== "undefined" ? window.innerHeight - 20 : 600)

    // Step 1: Build Huffman Tree
    const buildHuffmanTree = useCallback((inputText) => {
        const freq = {}
        for (const char of inputText) {
            freq[char] = (freq[char] || 0) + 1
        }

        const nodes = Object.entries(freq).map(([char, frequency]) => ({
            name: char,
            frequency,
        }))

            const heap = nodes.map((n) => ({ ...n, children: [] }));
            while (heap.length > 1) {
                heap.sort((a, b) => a.frequency - b.frequency);

                const left = heap.shift();
                const right = heap.shift();

                const parent = {
                    name: null,
                    frequency: left.frequency + right.frequency,
                    children: [left, right],
                };
                heap.push(parent);
                heap.sort((a, b) => a.frequency - b.frequency); // Re-sort after adding the parent
            }

            return heap[0];
    }, [])

    // Step 2: Assign Huffman Codes to Each Leaf
    const assignHuffmanCodes = useCallback((node, prefix = "", codeMap = {}) => {
        if (!node.children || node.children.length === 0) {
            node.code = prefix
            codeMap[node.name] = prefix
        } else {
            assignHuffmanCodes(node.children[0], prefix + "0", codeMap)
            assignHuffmanCodes(node.children[1], prefix + "1", codeMap)
        }
        return codeMap
    }, [])

    const prepareData = useCallback(() => {
        if (!text) {
            setTreeData(null);
            setCodeMap({});
            return;
        }
        const root = buildHuffmanTree(text)
        const map = assignHuffmanCodes(root)
        setCodeMap(map)
        setTreeData(root)
    }, [text, buildHuffmanTree, assignHuffmanCodes])

    useEffect(() => {
        prepareData()
    }, [text, prepareData])

    // Step 3: Render Tree with D3
    const render = useCallback(() => {
        if (!treeData || !svgRef.current) return

        const svg = d3.select(svgRef.current)
        svg.selectAll("*").remove()

        const hierarchy = d3.hierarchy(treeData)
        const treeLayout = d3.tree().size([height - 2 * PADDING, width - 2 * PADDING])
        const root = treeLayout(hierarchy)

        svg
            .selectAll("line.link")
            .data(root.links())
            .enter()
            .append("line")
            .attr("x1", d => d.source.y + PADDING)
            .attr("y1", d => d.source.x + PADDING)
            .attr("x2", d => d.target.y + PADDING)
            .attr("y2", d => d.target.x + PADDING)
            .attr("stroke", "#ccc")
            .attr("stroke-width", 2)

        const nodes = svg
            .selectAll("g.node")
            .data(root.descendants())
            .enter()
            .append("g")
            .attr("transform", d => `translate(${d.y + PADDING}, ${d.x + PADDING})`)

        nodes
            .append("circle")
            .attr("r", RADIUS)
            .attr("fill", "#69b3a2")

        nodes
            .append("text")
            .text(d => (treeData && d.data.name) ? `${d.data.name} (${d.data.code || ""})` : "")
            .attr("dy", 4)
            .attr("x", d => d.children ? -RADIUS - LABEL_SPACE : RADIUS + LABEL_SPACE)
            .attr("text-anchor", d => d.children ? "end" : "start")
            .style("font-size", "12px")
            .style("font-family", "sans-serif")
    }, [treeData, height, width])

    useEffect(() => {
        render()
    }, [treeData, render])

    return (
        <div className="flex flex-col items-center my-16">
            <input
                className="border p-2 my-4 rounded"
                type="text"
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Enter text to compress"
            />
            <svg ref={svgRef} width={width} height={height} />
            <div className="mt-4 text-sm">
                <h3 className="font-bold">Huffman Codes:</h3>
                <ul>
                    {Object.entries(codeMap).map(([char, code]) => (
                        <li key={char}>
                            <strong>{char}:</strong> {code}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
}

