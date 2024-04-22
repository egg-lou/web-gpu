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

  }

}

const renderer = new Renderer();
renderer.initialize().then(() => renderer.draw());