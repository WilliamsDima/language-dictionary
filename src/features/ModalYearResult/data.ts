import { palette } from '@/shared/styles/unistyles'

// градиент фона слайда подбирается по index % SLIDE_GRADIENTS.length —
// список слайдов теперь переменной длины (управляется админкой), поэтому
// набор градиентов просто зацикливается, а не мапится 1-в-1 на слайд
export const SLIDE_GRADIENTS = [
  {
    // 1. Приветствие — праздничный, с золотистыми оттенками
    colors: [palette.gradient_yellow, palette.gradient_pink],
    start: {
      x: 0,
      y: 0,
    },
    end: {
      x: 1,
      y: 1,
    },
  },
  {
    colors: [palette.gradient_pink, palette.gradient_green],
    start: {
      x: 1,
      y: 0,
    },
    end: {
      x: 1,
      y: 1,
    },
  },
  {
    colors: [palette.gradient_green, palette.gradient_cream],
    start: {
      x: 0,
      y: 0,
    },
    end: {
      x: 1,
      y: 1,
    },
  },
  {
    colors: [palette.gradient_cream, palette.gradient_violet],
    start: {
      x: 0,
      y: 0,
    },
    end: {
      x: 1,
      y: 1,
    },
  },
  {
    colors: [palette.gradient_violet, palette.gradient_magenta],
    start: {
      x: 0,
      y: 0,
    },
    end: {
      x: 1,
      y: 1,
    },
  },
  {
    colors: [palette.gradient_magenta, palette.gradient_blue],
    start: {
      x: 0,
      y: 0,
    },
    end: {
      x: 1,
      y: 1,
    },
  },
  {
    colors: [palette.gradient_blue, palette.gradient_purple],
    start: {
      x: 0,
      y: 0,
    },
    end: {
      x: 1,
      y: 1,
    },
  },
  {
    colors: [palette.gradient_purple, palette.gradient_gold],
    start: {
      x: 0,
      y: 0,
    },
    end: {
      x: 1,
      y: 1,
    },
  },
  {
    colors: [palette.gradient_gold, palette.gradient_sky],
    start: {
      x: 0,
      y: 0,
    },
    end: {
      x: 1,
      y: 1,
    },
  },

  {
    colors: [palette.gradient_sky, palette.gradient_mint],
    start: {
      x: 0,
      y: 0,
    },
    end: {
      x: 1,
      y: 1,
    },
  },
]
