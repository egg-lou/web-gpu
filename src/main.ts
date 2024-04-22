class Renderer {

  private context!: GPUCanvasContext;
  private device!: GPUDevice;

  public async initialize() {
    const canvas = document.getElementById('canvas') as HTMLCanvasElement;

    this.context = canvas.getContext('webgpu')!;

    if (!this.context) {
      alert('Your browser does not support WebGPU');
      return;
    }

    const adapter = await navigator.gpu.requestAdapter({
      powerPreference: 'low-power'
    });

    if (!adapter) {
      alert('No adapter found');
      return;
    }

    this.device = await adapter.requestDevice();

    this.context.configure ({
      device: this.device,
      format: navigator.gpu.getPreferredCanvasFormat()
    });

  }

  public draw() {

    const commandEncoder = this.device.createCommandEncoder();

    const textureView = this.context.getCurrentTexture().createView();

    const renderPassDescriptor: GPURenderPassDescriptor = {
      colorAttachments: [{
        view: textureView,
        loadValue: {r:0.0, g:0.0, b:0.0, a:1.0},
        loadOp: 'clear',
        storeOp: 'store'
      }]
    };

    const passEncoder = commandEncoder.beginRenderPass(renderPassDescriptor);
    passEncoder.endPass();

    this.device.queue.submit([commandEncoder.finish()]);
  }

}

const renderer = new Renderer();
renderer.initialize().then(() => renderer.draw());