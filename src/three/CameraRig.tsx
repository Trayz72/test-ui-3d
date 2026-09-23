import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useExperienceStore, scrollState } from "../state/experienceStore";
import {
  introCameraCurve,
  introLookCurve,
  corridorCameraCurve,
  corridorLookCurve,
  focusCameraFor,
} from "./layout";

const tmpPos = new THREE.Vector3();
const tmpLook = new THREE.Vector3();

export function CameraRig() {
  const currentLook = useRef(new THREE.Vector3(0, 1.4, 0));
  const time = useRef(0);

  useFrame(({ camera, clock }, delta) => {
    time.current = clock.elapsedTime;
    const { phase, focusedIndex, hasEntered } = useExperienceStore.getState();

    if (phase === "focus" && focusedIndex !== null) {
      const { position, target } = focusCameraFor(focusedIndex);
      tmpPos.copy(position);
      tmpLook.copy(target);
    } else if (!hasEntered) {
      tmpPos.copy(introCameraCurve.getPoint(0));
      tmpPos.y += Math.sin(time.current * 0.5) * 0.03;
      tmpLook.copy(introLookCurve.getPoint(0));
    } else if (phase === "intro") {
      const t = THREE.MathUtils.clamp(scrollState.introProgress, 0, 1);
      tmpPos.copy(introCameraCurve.getPoint(t));
      tmpLook.copy(introLookCurve.getPoint(t));
    } else {
      const t = THREE.MathUtils.clamp(scrollState.corridorProgress, 0, 1);
      tmpPos.copy(corridorCameraCurve.getPoint(t));
      tmpLook.copy(corridorLookCurve.getPoint(t));
    }

    const damp = phase === "focus" ? 3.2 : 5.5;
    camera.position.lerp(tmpPos, 1 - Math.exp(-damp * delta));
    currentLook.current.lerp(tmpLook, 1 - Math.exp(-damp * delta));
    camera.lookAt(currentLook.current);
  });

  return null;
}
