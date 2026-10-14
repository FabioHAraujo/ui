---
"@codeatlasdev/ui": patch
---

CommandPalette: keyboard selection no longer gets stolen by the pointer. A row appearing under a stationary pointer (list renders, dialog animates in) fired `mouseenter` and moved the highlight; hover now follows real `mousemove`. ArrowDown on an empty list no longer stores `-1`.
