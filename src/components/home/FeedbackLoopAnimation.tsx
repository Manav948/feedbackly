'use client';

import React, { useEffect, useRef } from 'react';

export default function FeedbackLoopAnimation() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    let gl: WebGLRenderingContext | null = null;
    try {
      gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl') as WebGLRenderingContext;
    } catch (e) {
      console.error('WebGL context not supported', e);
      return;
    }

    if (!gl) return;

    // Vertex Shader Source
    const vsSource = `
      attribute vec2 a_position;
      varying vec2 v_texCoord;
      void main() {
        v_texCoord = a_position * 0.5 + 0.5;
        gl_Position = vec4(a_position, 0.0, 1.0);
      }
    `;

    // Fragment Shader Source
    const fsSource = `
      precision highp float;
      uniform float u_time;
      uniform vec2 u_resolution;
      varying vec2 v_texCoord;

      vec2 rot2d(vec2 p, float a) {
        float s = sin(a), c = cos(a);
        return vec2(p.x * c - p.y * s, p.x * s + p.y * c);
      }

      float sdBox(vec3 p, vec3 b) {
        vec3 q = abs(p) - b;
        return length(max(q, 0.0)) + min(max(q.x, max(q.y, q.z)), 0.0);
      }

      float getMap(vec3 p, out int objType) {
        // Rotate the entire loop slowly
        p.xz = rot2d(p.xz, u_time * 0.15);
        p.xy = rot2d(p.xy, u_time * 0.08);
        
        float R = 2.1; // Major radius of torus
        
        // 12 segments
        float segments = 12.0;
        float angle = atan(p.z, p.x);
        float sector = floor(angle * segments / 6.2831853 + 0.5);
        float localAngle = angle - sector * (6.2831853 / segments);
        
        vec3 q = p;
        q.xz = rot2d(q.xz, -sector * (6.2831853 / segments));
        q.x -= R;
        
        // Twist individual segment around its center
        q.xy = rot2d(q.xy, u_time * 0.4 + sector * 0.5);
        q.yz = rot2d(q.yz, u_time * 0.2);
        
        float arcLength = R * (6.2831853 / segments);
        vec3 boxSize = vec3(0.32, 0.32, arcLength * 0.35);
        
        float dBox = sdBox(q, boxSize) - 0.06;
        
        objType = 1;
        return dBox;
      }

      float hash3(vec3 p) {
        p = fract(p * vec3(443.897, 441.423, 437.195));
        p += dot(p, p.yxz + 19.19);
        return fract((p.x + p.y) * p.z);
      }

      void main() {
        // Adjust for aspect ratio
        vec2 uv = (gl_FragCoord.xy - u_resolution * 0.5) / u_resolution.y;
        
        // Camera (moved back to fit the ring perfectly in the viewport)
        vec3 ro = vec3(0.0, 0.0, -6.8);
        vec3 rd = normalize(vec3(uv, 1.3));
        
        float t = 0.0;
        int objType = 0;
        bool hit = false;
        vec3 p;
        
        for (int i = 0; i < 70; i++) {
          p = ro + rd * t;
          float d = getMap(p, objType);
          if (d < 0.001) {
            hit = true;
            break;
          }
          if (t > 12.0) break;
          t += d;
        }
        
        vec3 color = vec3(0.0); // Black background
        
        if (hit) {
          // Calculate normal
          vec2 eps = vec2(0.002, 0.0);
          int temp;
          vec3 normal = normalize(vec3(
            getMap(p + eps.xyy, temp) - getMap(p - eps.xyy, temp),
            getMap(p + eps.yxy, temp) - getMap(p - eps.yxy, temp),
            getMap(p + eps.yyx, temp) - getMap(p - eps.yyx, temp)
          ));
          
          // Shading parameters
          vec3 lightDir = normalize(vec3(3.0, 5.0, -4.0));
          vec3 viewDir = normalize(ro - p);
          vec3 halfDir = normalize(lightDir + viewDir);
          
          float diff = max(dot(normal, lightDir), 0.0);
          float spec = pow(max(dot(normal, halfDir), 0.0), 40.0);
          
          // Base color - dark premium charcoal
          vec3 baseColor = vec3(0.07, 0.07, 0.08);
          
          // Sparkling crystalline dots
          float sparkleNoise = hash3(floor(p * 22.0 + sin(u_time * 1.8)));
          float sparkle = smoothstep(0.965, 1.0, sparkleNoise);
          
          // Silver glowing edges
          float fresnel = pow(1.0 - max(dot(normal, viewDir), 0.0), 3.5);
          
          color = baseColor * (diff * 0.7 + 0.3) + vec3(spec * 0.85);
          color += vec3(sparkle * 1.8);
          color += vec3(fresnel * 0.5) * vec3(0.88, 0.88, 0.94);
          
          // Fog depth shading (adjusted for new camera position)
          color = mix(color, vec3(0.0), smoothstep(4.0, 9.5, t));
        }
        
        gl_FragColor = vec4(color, 1.0);
      }
    `;

    // Helper functions to compile and link shader program
    function createShader(glContext: WebGLRenderingContext, type: number, source: string) {
      const shader = glContext.createShader(type);
      if (!shader) return null;
      glContext.shaderSource(shader, source);
      glContext.compileShader(shader);
      if (!glContext.getShaderParameter(shader, glContext.COMPILE_STATUS)) {
        console.error('Shader compilation error:', glContext.getShaderInfoLog(shader));
        glContext.deleteShader(shader);
        return null;
      }
      return shader;
    }

    const vertexShader = createShader(gl, gl.VERTEX_SHADER, vsSource);
    const fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, fsSource);
    if (!vertexShader || !fragmentShader) return;

    const program = gl.createProgram();
    if (!program) return;
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);

    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.error('Shader program linking error:', gl.getProgramInfoLog(program));
      return;
    }

    gl.useProgram(program);

    // Create quad buffer
    const positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    const positions = new Float32Array([
      -1.0, -1.0,
       1.0, -1.0,
      -1.0,  1.0,
      -1.0,  1.0,
       1.0, -1.0,
       1.0,  1.0,
    ]);
    gl.bufferData(gl.ARRAY_BUFFER, positions, gl.STATIC_DRAW);

    const positionAttributeLocation = gl.getAttribLocation(program, 'a_position');
    gl.enableVertexAttribArray(positionAttributeLocation);
    gl.vertexAttribPointer(positionAttributeLocation, 2, gl.FLOAT, false, 0, 0);

    const uTimeLocation = gl.getUniformLocation(program, 'u_time');
    const uResolutionLocation = gl.getUniformLocation(program, 'u_resolution');

    // Sync drawing buffer size
    const resizeCanvas = () => {
      const rect = canvas.getBoundingClientRect();
      const width = rect.width * (window.devicePixelRatio || 1);
      const height = rect.height * (window.devicePixelRatio || 1);
      if (canvas.width !== width || canvas.height !== height) {
        canvas.width = width;
        canvas.height = height;
        if (gl) gl.viewport(0, 0, width, height);
      }
    };

    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    let animationFrameId = 0;
    const render = (time: number) => {
      if (!gl) return;
      resizeCanvas();

      gl.clearColor(0.0, 0.0, 0.0, 1.0);
      gl.clear(gl.COLOR_BUFFER_BIT);

      gl.useProgram(program);
      gl.uniform1f(uTimeLocation, time * 0.001);
      gl.uniform2f(uResolutionLocation, canvas.width, canvas.height);

      gl.drawArrays(gl.TRIANGLES, 0, 6);

      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', resizeCanvas);
      if (gl) {
        gl.deleteProgram(program);
        gl.deleteShader(vertexShader);
        gl.deleteShader(fragmentShader);
        gl.deleteBuffer(positionBuffer);
      }
    };
  }, []);

  return (
    <div className="relative w-full h-[350px] lg:h-[450px] overflow-hidden">
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full cursor-pointer transition-opacity duration-500 opacity-95 hover:opacity-100"
        style={{ touchAction: 'none' }}
      />
    </div>
  );
}
