<template>
  <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar>
        <ion-title>Blank</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content :fullscreen="true" class="ion-padding">
      <ion-card>
        <ion-card-header>
          <h2>This is the Camera Page</h2>
        </ion-card-header>
        <ion-card-content>
          <div>Showing the use of the Capacitor Camera plugin and the vue-router for changing pages in the application</div>
          <div class="ion-padding">
            <img :src="imageUrl ? imageUrl : null" />
          </div>
          <ion-toolbar>
            <slot name="start">
              <ion-button @click="takePicture()">Take Picture Now</ion-button>
            </slot>
            <slot name="end">
              <ion-button @click="nextPage()">Next Page</ion-button>
            </slot>
          </ion-toolbar>
        </ion-card-content>
      </ion-card>
    </ion-content>
    <ion-content>
      <qrcode-stream></qrcode-stream>
      <qrcode-drop-zone></qrcode-drop-zone>
      <qrcode-capture></qrcode-capture>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import {
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonButton,
} from "@ionic/vue";

// @ts-ignore
import { QrcodeStream, QrcodeDropZone, QrcodeCapture } from 'vue-qrcode-reader';

import { Plugins, CameraSource, CameraResultType } from "@capacitor/core";
const { Camera } = Plugins;

import { defineComponent, ref } from "vue";
import { useRouter } from "vue-router";

export default defineComponent({
  name: "Home",
  components: {
    IonCard,
    IonCardContent,
    IonCardHeader,
    IonContent,
    IonHeader,
    IonPage,
    IonTitle,
    IonToolbar,
    IonButton,
    QrcodeStream,
    QrcodeDropZone,
    QrcodeCapture
  },
  setup() {
    const imageUrl = ref<string | null>();
    const router = useRouter();

    const nextPage = () => {
      router.push("/geolocation");
    };

    const takePicture = async () => {
      // Otherwise, make the call:
      try {
        const image = await Camera.getPhoto({
          quality: 90,
          allowEditing: true,
          resultType: CameraResultType.DataUrl,
          source: CameraSource.Prompt,
        });
        console.log("image", image);
        // image.base64_data will contain the base64 encoded result as a JPEG, with the data-uri prefix added
        imageUrl.value = image.dataUrl;
        // can be set to the src of an image now
        console.log(image);
      } catch (e) {
        console.log("error", e);
      }
    };
    return {
      takePicture,
      imageUrl,
      nextPage,
    };
  },
});
</script>

<style scoped>
#container {
  text-align: center;

  position: absolute;
  left: 0;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
}

#container strong {
  font-size: 20px;
  line-height: 26px;
}

#container p {
  font-size: 16px;
  line-height: 22px;

  color: #8c8c8c;

  margin: 0;
}

#container a {
  text-decoration: none;
}
</style>