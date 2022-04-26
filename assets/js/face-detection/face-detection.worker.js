importScripts('tf-core.min.js', 'tf-converter.min.js', 'tf-backend-wasm.js', 'blazeface.min.js');

var model;

addEventListener('message', ({ data }) => {
    if (data.event === 'loadModel') loadModel();
    else if (data.event === 'detectFace') detectFace(data.data);
});


async function loadModel() {
  try {
    await tf.setBackend('wasm');
    model = await blazeface.load({ maxFaces: 1, iouThreshold: 0.7, scoreThreshold: 0.995 });
    postMessage({event: 'loadModel'});
  } catch(error) {
    postMessage({event: 'loadModelError'});
  }
}

async function detectFace(data) {
  const faces = await this.model.estimateFaces(data, false, false);
  postMessage({event: 'detectFace', faces: faces});
}
