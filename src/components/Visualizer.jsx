import React, { useState } from 'react'
import HuffmanTree from './HuffmanTree'

const Visualizer = () => {
    const [text, setText] = useState("Hello, How are you?");

    return (
        <div>
            <h1 className='mt-12'>D3 Tree Visualization</h1>
            <textarea
                rows={3}
                value={text}
                onChange={(e) => setText(e.target.value)}
                style={{ width: "100%", marginBottom: 20 }}
            />
            <HuffmanTree initialText={text} />
        </div>
    )
}

export default Visualizer

