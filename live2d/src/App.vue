<script setup>
import { onBeforeUnmount, onMounted, ref } from 'vue'
import * as PIXI from 'pixi.js'
import { Live2DModel } from 'pixi-live2d-display';

window.PIXI = PIXI;

const canvas = ref(null)
const audioFile = '../../src/assets/sounds/sound.wav';

let app;
let model;
let audioContext;

function random(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

async function speaking() {
  const response = await fetch(audioFile);
  const audioData = await response.arrayBuffer();
  const audioBuffer = await audioContext.decodeAudioData(audioData);

  const source = audioContext.createBufferSource();
  const analyser = audioContext.createAnalyser();

  source.buffer = audioBuffer;
  analyser.connect(audioContext.destination);
  source.connect(analyser);

  source.start(0);

  const updateMouth = () => {
    const dataArray = new Uint8Array(analyser.frequencyBinCount);
    analyser.getByteFrequencyData(dataArray);

    const volume = dataArray.reduce((a, b) => a + b) / dataArray.length;
    const mouthOpen = Math.min(1, volume / 50);

    model.internalModel.coreModel.setParamFloat('PARAM_MOUTH_OPEN_Y', mouthOpen);

    if (audioContext.state !== 'closed') {
      requestAnimationFrame(updateMouth);
    }
  };

  updateMouth();
}

function animation() {
  model.motion(`motion${random(0, 12)}`)
}
function expression() {
  model.expression(`f0${random(1, 8)}`)
}

onMounted(async () => {
  audioContext = new AudioContext()
  app = new PIXI.Application({
    view: canvas.value,
    height: window.innerHeight,
    width: window.innerWidth,
    autoDensity: true,
    antialias: true,
    resolution: window.devicePixelRatio,
    // transparent: true,
  });
  model = await Live2DModel.from('../../src/assets/mikoto/mikoto.model.json')
  app.stage.addChild(model)
  model.scale.set(.6)
})

onBeforeUnmount(() => {
  model?.destroy()
  app?.destroy()
  audioContext?.close()
})
</script>

<template>
  <div style="width:100%;height:100%;z-index: -1000;">
    <canvas ref="canvas"></canvas>
    <div class="btn animation" @click="$event => animation()">动画</div>
    <div class="btn expression" @click="$event => expression()">表情</div>
    <div class="btn speaking" @click="$event => speaking()">说话</div>
  </div>
</template>

<style scoped>
.btn {
  position: fixed;
  top: 30px;
  left: 30px;
  width: 100px;
  height: 60px;
  color: #fff;
  text-align: center;
  font-size: 22px;
  line-height: 60px;
  cursor: pointer;
  background: #000;
  z-index: 5;
}

.expression {
  top: 100px;
}

.speaking {
  top: 170px;
}
</style>