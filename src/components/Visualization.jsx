import React, { useRef, useEffect, useState } from "react";
import * as d3 from "d3";

const HuffmanVisualizer = () => {
    const svgRef = useRef();
    const table = useRef({});
    const data = useRef(null);
    const root = useRef(null);
    const motionOn = useRef(false);
    const mouseFreeze = useRef(null);
    // const stop = useRef(false);

    const offset = 100;
    const radius = 10;
    // const labelSpace = 10;
    // const delay = 500;
    const period = 1000;
    const quick = 200;
    const h = 500;
    const w = 500;

    const [text, setText] = useState("hello world");

    useEffect(() => {
        onTextChange(text);
    }, [text]);

    function getFrequency(t) {
        const f = {};
        Array.from(t).forEach((x) => {
            if (!f[x]) f[x] = 0;
            f[x]++;
        });
        return f;
    }

    function postProcessing(node, key = "") {
        if (!node.children) {
            node.key = node.name;
            table.current[node.name] = key.slice(0, -1);
            return;
        }
        node.key = key;
        for (let i = 0; i < node.children.length; i++) {
            postProcessing(node.children[i], key + i.toString());
        }
    }

    function getHuffmanTree(f) {
        let nodes = [];
        let formationId = 1;
        for (let k in f) {
            nodes.push({
                value: f[k],
                formationId: formationId++,
                children: [{ name: k }],
            });
        }
        nodes.sort((a, b) => a.value - b.value);
        let p = nodes.shift();
        let queue = [];
        while (nodes.length || queue.length) {
            const q =
                nodes.length && queue.length
                    ? queue[0].value < nodes[0].value
                        ? queue.shift()
                        : nodes.shift()
                    : queue.length
                        ? queue.shift()
                        : nodes.shift();
            queue.push({
                value: p.value + q.value,
                formationId: formationId++,
                children: [p, q],
            });
            p =
                nodes.length && queue.length
                    ? queue[0].value < nodes[0].value
                        ? queue.shift()
                        : nodes.shift()
                    : queue.length
                        ? queue.shift()
                        : nodes.shift();
        }
        postProcessing(p);
        return p;
    }

    function onTextChange(t) {
        if (!t) return;
        table.current = {};
        const freq = getFrequency(t);
        data.current = getHuffmanTree(freq);
        root.current = d3.hierarchy(data.current);
        const treeLayout = d3.cluster().size([h, w]);
        treeLayout(root.current);

        const svg = d3.select(svgRef.current);
        svg.selectAll("*").remove(); 

        svg
            .selectAll("line.link")
            .data(root.current.links())
            .enter()
            .append("line")
            .classed("link", true)
            .attr("y1", (d) => offset + d.source.x)
            .attr("x1", (d) => offset + d.source.y)
            .attr("y2", (d) => offset + d.target.x)
            .attr("x2", (d) => offset + d.target.y)
            .style("stroke", "lightgrey");

        svg
            .selectAll("circle.node")
            .data(root.current.descendants())
            .enter()
            .append("circle")
            .classed("node", true)
            .attr("cy", (d) => offset + d.x)
            .attr("cx", (d) => offset + d.y)
            .attr("r", radius)
            .style("fill", "lightcyan")
            .on("mouseover", (event, d) => mouseOver(d))
            .on("mouseout", (event, d) => mouseOut(d));

        svg
            .selectAll("text.count")
            .data(root.current.descendants())
            .enter()
            .append("text")
            .classed("count", true)
            .attr("y", (d) => offset + d.x - 15)
            .attr("x", (d) => offset + d.y)
            .style("text-anchor", "middle")
            .text((d) => d.data.value);

        svg
            .selectAll("text.label")
            .data(root.current.descendants())
            .enter()
            .append("text")
            .classed("label", true)
            .attr("y", (d) => offset + d.x + 20)
            .attr("x", (d) => offset + d.y)
            .style("text-anchor", "middle")
            .text((d) =>
                d.data.name ? `${d.data.name}   ${table.current[d.data.key] || ""}` : ""
            );

        svg
            .selectAll("text.link")
            .data(root.current.links())
            .enter()
            .append("text")
            .classed("link", true)
            .attr("y", (d) => offset + (d.source.x + d.target.x) / 2)
            .attr("x", (d) => offset + (d.source.y + d.target.y) / 2)
            .style("font-size", "12px")
            .style("opacity", (d) => d.target.height)
            .text((d) => d.target.data.key?.slice(-1));

        render();
        outputText();

    }

    function render() {
        const svg = d3.select(svgRef.current);
        svg
            .selectAll("line.link")
            .transition()
            .duration(period)
            .on("start", () => (motionOn.current = true))
            .on("end", () => (motionOn.current = false))
            .style("stroke", "lightgrey")
            .style("opacity", (d) => d.target.height);

        svg
            .selectAll("circle.node")
            .transition()
            .duration(period)
            .attr("r", radius)
            .style("opacity", (d) => d.height);

        svg
            .selectAll("text.count")
            .transition()
            .duration(period)
            .text((d) => d.data.value);

        svg
            .selectAll("text.label")
            .transition()
            .duration(period)
            .text((d) =>
                d.data.name ? `${d.data.name}   ${table.current[d.data.key] || ""}` : ""
            );

        svg
            .selectAll("text.link")
            .transition()
            .duration(period)
            .attr("y", (d) => offset + (d.source.x + d.target.x) / 2)
            .attr("x", (d) => offset + (d.source.y + d.target.y) / 2)
            .text((d) => d.target.data.key?.slice(-1));
    }

    function highlight() {
        const svg = d3.select(svgRef.current);
        svg
            .selectAll("line.link")
            .transition()
            .duration(quick)
            .style("stroke", (d) => (d.target.highlight ? "aqua" : "lightgrey"));
        svg
            .selectAll("circle.node")
            .transition()
            .duration(quick)
            .style("fill", (d) => (d.highlight ? "aqua" : "lightcyan"))
            .attr("r", (d) => radius * (d.highlight ? 1.5 : 1));
        svg
            .selectAll("text.link")
            .transition()
            .duration(quick)
            .style("fill", (d) => (d.target.highlight ? "black" : "#e6e6e6"))
            .style("font-weight", (d) => (d.target.highlight ? "bold" : "lighter"));
    }

    function mouseOver(d) {
        if (motionOn.current) return;
        if (mouseFreeze.current) {
            const frozen = mouseFreeze.current;
            mouseFreeze.current = null;
            mouseOut(frozen);
        }
        d.ancestors().forEach((x) => (x.highlight = true));
        highlight();
    }

    function mouseOut(d) {
        if (motionOn.current) return;
        d.ancestors().forEach((x) => (x.highlight = false));
        highlight();
    }

    function outputText() {
        const out_text = d3.select("#output_text");
        out_text.html("");
        for (let i = 0; i < text.length; i++) {
            const c = text[i];
            for (const s of table.current[c]) {
                out_text
                    .append("span")
                    .classed("c" + c.charCodeAt().toString(), true)
                    .text(s);
            }
        }
    }

    return (
        <div className="flex mt-[40px] h-[calc(100vh-65px)]">
            <div className="w-1/2 ">
                <svg
                    ref={svgRef}
                    width={w + 2 * offset}
                    height={h + 2 * offset}
                />
            </div>
            <div className="w-1/2 flex flex-col">
                <textarea
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    placeholder="Type something..."
                    className="h-1/2 bg-green-200 p-2 font-bold text-lg"
                />
                <div id="output_text" className='flex flex-wrap h-1/2 bg-yellow-200'></div>
            </div>
        </div>
    );
};

export default HuffmanVisualizer;
