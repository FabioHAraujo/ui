<script lang="ts">
  import { uid } from '../../utils/index.js';
  let glassId = $state(uid('lg'));

  interface Props {
    optics: {
      frost: number;
      bend: number;
      depth: number;
      curvature: number;
      sheen: number;
      dispersion: number;
    };
    style?: string;
  }

  let { optics, style = '' }: Props = $props();
</script>

<svg
  aria-hidden="true"
  {style}
  style:position="absolute"
  style:inset="0"
  style:width="100%"
  style:height="100%"
  style:pointer-events="none"
  style:border-radius="inherit"
  style:overflow="hidden"
>
  <defs>
    <filter id={glassId} x="0%" y="0%" width="100%" height="100%" color-interpolation-filters="linearRGB">
      <feTurbulence
        type="fractalNoise"
        baseFrequency={optics.bend * 0.02}
        numOctaves={3}
        result="noise"
      />
      <feDisplacementMap
        in="SourceGraphic"
        in2="noise"
        scale={optics.frost}
        xChannelSelector="R"
        yChannelSelector="G"
        result="displaced"
      />
      <feComposite in="displaced" in2="SourceGraphic" operator="in" />
    </filter>
  </defs>
  <rect width="100%" height="100%" filter="url(#{glassId})" fill="none" />
</svg>
