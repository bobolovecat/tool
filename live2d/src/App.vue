<script setup>
import { onMounted, ref } from 'vue'
import axios from 'axios'
import * as PIXI from 'pixi.js'
import {
  Live2DModel,
  MotionPreloadStrategy,
  InternalModel,
} from 'pixi-live2d-display';

window.PIXI = PIXI;

const canvas = ref(null)

const audioUrl = ref('https://image-1251917893.file.myqcloud.com/tip-project/live2d/audio/out3.ogg');

let app;
let model;

// 嘴把张开闭合逻辑
const setMouthOpenY = (v) => {
  v = Math.max(0,Math.min(1,v));
  // model.internalModel.coreModel.setParameterValueById('PARAM_MOUTH_FORM',v);
  model.internalModel.coreModel.setParamFloat('PARAM_MOUTH_OPEN_Y', v);
}

function init() {
  (async function() {
    // model = await Live2DModel.from('../../src/assets/Mao/Mao.model3.json', { motionPreload: MotionPreloadStrategy.NONE,  })
    model = await Live2DModel.from('../../src/assets/mikoto/mikoto.model.json', { motionPreload: MotionPreloadStrategy.NONE,  })
    app = new PIXI.Application({
      view: canvas.value,
      height: window.innerHeight,
      width: window.innerWidth,
      resolution: window.devicePixelRatio,
      autoDensity: true,
      autoResize: true,
      antialias: true,
      transparent: true,
      autoUpdate: true,
    });
    app.stage.addChild(model)
    // 模型的位置,x,y相较于窗口左上角
    model.x = 0
    model.y = -200

    model.on('pointerdown', (hitAreas) => {   
      const { x, y } = hitAreas.data.global  
    // 需要用到频谱的时候 从分析仪获取到 之前备用的 frequencyData 里
      model.motion('tap', 5)
      const point = model.hitTest(x, y)
      console.log(point);
    });
  })()
}

function addFrame(model) {
  const foreground = PIXI.Sprite.from(PIXI.Texture.WHITE);
  foreground.width = model.internalModel.width;
  foreground.height = model.internalModel.height;
  foreground.alpha = 0.2;

  model.addChild(foreground);
  foreground.visible = true
}

function speaking() {
  (async function() {

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
        audioCtx.decodeAudioData(audioData, function(buffer) {
          // 新建 Buffer 源
          const source = audioCtx.createBufferSource();
          source.buffer = buffer;
          // 连接到 audioCtx
          source.connect(audioCtx.destination);
          // 连接到 音频分析器
          source.connect(analyser);
          // 开始播放
          source.start();

          source.onended = () =>{
            playing = false;
            setMouthOpenY(0);
          };
        });
      }

      fetchAudioData(audioLink)
      const getByteFrequencyData = ()=>{
        analyser.getByteFrequencyData(frequencyData);
        return frequencyData;
      };

      const o = 80;
      const arrayAdd = (a) => a.reduce((i,a) => i+a, 0);
      let playing = true;
      const run = () =>{
        if(!playing) return;
        console.log(playing);
        const frequencyData = getByteFrequencyData();
        const arr = [];
        // 频率范围还是太广了，跳采！
        for (var i = 0; i < 700; i += o) {
          arr.push(frequencyData[i]);
        }
        setMouthOpenY((arrayAdd(arr)/arr.length - 20)/60);
        setTimeout(run,1000/30);
      }
      run();
    }
    audioPlay(audioUrl.value);
  })()
}

function animation() {
  (async function() {
    model.motion('motion5')
  })()
}

onMounted(() => {
  // addFrame(model)
  init()
})
</script>
  
<template>
  <div style="width:100%;height:100%;z-index: -1000;">
    <canvas ref="canvas" class="canvas_view_content" id="canvas_view"></canvas>
    <div class="btn speaking" @click="$event => speaking()">说话</div>
    <div class="btn animation" @click="$event => animation()">动画</div>
  </div>
</template>
  
<style scoped>
.btn {
  position: fixed;
  top:30px;
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
.animation {
  top: 100px;
}
</style>