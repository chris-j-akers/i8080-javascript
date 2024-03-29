import React from 'react'
import { useEffect, useState } from 'react'

function Screen({connectScreenToVRAMState, backgroundColor, color, programStatus }) {

    const canvasRef = React.useRef(null);
    const [VRAM, updateVRAM] = useState(new Array(0x1BFF).fill(0));

    /* We update when a new version of VRAM is ready, following the VBLank
    interrupts, but the VRAM comes from the Web Worker at the top App level. We,
    therefore, need some way to update the state with the new VRAM, but without
    re-rendering all top-level components unncessarily. Here we connect the Screen
    stateUpdate function to its parent which will call it when a new VRAM buffer
    arrives from the worker */
    useEffect( () => {
        connectScreenToVRAMState(updateVRAM);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[]);

    useEffect( () => {
        switch(programStatus) {
            case 'RESET':
                updateVRAM(new Array(0x1BFF).fill(0));
                break;
            default:
                break;
        }
    }, [programStatus]);

    /* Re-draw the screen when VRAM buffer in state changes*/
    useEffect( () => {
        const ctx = canvasRef.current.getContext("2d"); 

        /* Before we draw, we save, then rotate the context of the Canvas. Space
        Invaders draws its screen at a 90 degree angle (the monitor was physically
        rotated in the cabinet) so if we draw the video buffer using a rotated
        context then restore that context the game will appear the right way up. */
        ctx.save();
        ctx.translate(0, 256);
        ctx.rotate(270*Math.PI/180);

        /* Draw VRAM out to the canvas */
        ctx.fillStyle = backgroundColor;
        ctx.fillRect(0, 0, 256, 300);
        ctx.fillStyle = color;
        let pixel;
        let rectX;
        let rectY;
        for (let y=0; y<256; y++) {
            for (let x=0; x<32; x++) {
                pixel = VRAM[(y * 32 + x)];
                for (let bit=0; bit<8; bit++) {
                    if ((pixel >> bit) & 1) {
                        rectX = ((x * 8) + bit);
                        rectY = y;
                        ctx.fillRect(rectX,rectY,1,1);
                    }
                }
            }
        }
        /* 'Un-rotate' canvas */
        ctx.restore();

    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [VRAM]);    

    return (
        <canvas id='game-cabinet-screen-canvas' width='224' height='256'ref={canvasRef}/>
    )
}

Screen.defaultProps = {
    backgroundColor: '#1D2228',
    color: '#E1E2E2'
}

export default Screen
