
const canvas = document.getElementById("canvas1");

const gl = canvas.getContext("webgl");


let vertexData = [
    -0.5, 0.5,
    0.5, 0.5,
    0.5, -0.5,
    -0.5, 0.5,
    0.5, -0.5,
    -0.5, -0.5,
];


const { mat4 } = glMatrix;

const vertexBuffer = gl.createBuffer();
gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertexData), gl.STATIC_DRAW);
gl.bindBuffer(gl.ARRAY_BUFFER, null);


let vertexShader = gl.createShader(gl.VERTEX_SHADER);
let vertexCode = `
attribute vec2 position;
uniform mat4 rotation;
    void main() {
        gl_Position = rotation * vec4(position, 0, 1);
    }
`;


gl.shaderSource(vertexShader, vertexCode);
gl.compileShader(vertexShader);

let fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
let fragmentCode = `
    void main() {
        gl_FragColor = vec4(1, 0, 0, 1);
    }
`;


gl.shaderSource(fragmentShader, fragmentCode);
gl.compileShader(fragmentShader);

const program = gl.createProgram();


gl.attachShader(program, vertexShader);

gl.attachShader(program, fragmentShader);
gl.linkProgram(program);

gl.useProgram(program);

const positionLocation = gl.getAttribLocation(program, "position");
const rotationLocation = gl.getUniformLocation(program, "rotation");
gl.enableVertexAttribArray(positionLocation);
gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);

const matrix = mat4.create();

function animate() {
    requestAnimationFrame(animate);
    mat4.rotateZ(matrix, matrix, Math.PI * 2 / 500)
    gl.uniformMatrix4fv(rotationLocation, false, matrix);
    gl.drawArrays(gl.TRIANGLES, 0, 6);

}

animate();