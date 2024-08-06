<script setup>
import { onBeforeUnmount, onMounted, ref } from 'vue'
import axios from 'axios'
import * as PIXI from 'pixi.js'
import {
  Live2DModel,
  MotionPreloadStrategy,
} from 'pixi-live2d-display';

window.PIXI = PIXI;

const canvas = ref(null)

const audioUrl = ref('https://image-1251917893.file.myqcloud.com/tip-project/live2d/audio/out3.ogg');

let app;
let model;

// 嘴把张开闭合逻辑
const setMouthOpenY = (v) => {
  v = Math.max(0, Math.min(1, v));
  // model.internalModel.coreModel.setParameterValueById('PARAM_MOUTH_FORM',v);
  model.internalModel.coreModel.setParamFloat('PARAM_MOUTH_OPEN_Y', v);
}

function random(min, max) { 
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function speaking() {
  (async function () {

    // hitAreas:模型的一些上下文

    function audioPlay(audioLink) {
      const audioCtx = new AudioContext();
      // 新建分析仪
      const analyser = audioCtx.createAnalyser();
      // 根据 频率分辨率建立个 Uint8Array 数组备用
      const frequencyData = new Uint8Array(analyser.frequencyBinCount);
      // 取音频文件成 arraybuffer
      async function fetchAudioData(audioOrigin) {
        const response = await axios.get(audioOrigin, {
          responseType: 'arraybuffer'
        })
        const audioData = response.data;
        audioCtx.decodeAudioData(audioData, function (buffer) {
          // 新建 Buffer 源
          const source = audioCtx.createBufferSource();
          source.buffer = buffer;
          // 连接到 audioCtx
          source.connect(audioCtx.destination);
          // 连接到 音频分析器
          source.connect(analyser);
          // 开始播放
          source.start();

          source.onended = () => {
            playing = false;
            setMouthOpenY(0);
          };
        });
      }

      fetchAudioData(audioLink)
      const getByteFrequencyData = () => {
        analyser.getByteFrequencyData(frequencyData);
        return frequencyData;
      };

      const o = 80;
      const arrayAdd = (a) => a.reduce((i, a) => i + a, 0);
      let playing = true;
      const run = () => {
        if (!playing) return;
        console.log(playing);
        const frequencyData = getByteFrequencyData();
        const arr = [];
        // 频率范围还是太广了，跳采！
        for (var i = 0; i < 700; i += o) {
          arr.push(frequencyData[i]);
        }
        setMouthOpenY((arrayAdd(arr) / arr.length - 20) / 60);
        setTimeout(run, 1000 / 30);
      }
      run();
    }
    audioPlay(audioUrl.value);
  })()
}

function animation() {
  model.motion(`motion${random(0, 12)}`)
}
function expression() {
  model.expression(`f0${random(1, 8)}`)
}

onMounted(async () => {
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