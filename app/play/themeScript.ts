/* Theme for <head>: runs before first paint so there is no flash.
   Mirrors apply() in palettes.ts. */
export const themeScript = `(function(){try{var m=localStorage.getItem("theme-mode")||"system";var a=localStorage.getItem("palette-accent")||"auto";var dk=m==="dark"||(m==="system"&&matchMedia("(prefers-color-scheme: dark)").matches);var p=a==="auto"?(dk?"ink":"paper"):a;var d=document.documentElement;d.dataset.palette=p;d.dataset.theme=p==="ink"||p==="night"?"dark":"light";d.style.colorScheme=d.dataset.theme;}catch(e){}})();`;
