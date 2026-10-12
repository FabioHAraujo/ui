<script lang="ts">
  import { Accordion, AccordionItem } from '@codeatlasdev/ui';
</script>

<div class="wrap">
  <Accordion type="single">
    <AccordionItem value="a1" title="What is Liquid Glass?">
      Liquid Glass is a design language that applies real-time backdrop blur, refraction and
      tinting to UI surfaces, creating depth without heavy visual weight.
    </AccordionItem>
    <AccordionItem value="a2" title="Which browsers support backdrop-filter?">
      All modern evergreen browsers. Older environments receive a fallback without the blur effect.
    </AccordionItem>
    <AccordionItem value="a3" title="Can I nest GlassSurface inside GlassCard?">
      Yes. Both components use isolation: isolate to keep stacking contexts correct.
    </AccordionItem>
  </Accordion>
</div>

<style>
  .wrap { width: 100%; max-width: 560px; }
</style>
