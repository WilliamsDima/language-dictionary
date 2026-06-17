import { ReactNode } from 'react'
import YearResultSlide1 from './UI/YearResultSlide1/YearResultSlide1'
import YearResultSlide2 from './UI/YearResultSlide2/YearResultSlide2'
import YearResultSlide3 from './UI/YearResultSlide3/YearResultSlide3'
import YearResultSlide4 from './UI/YearResultSlide4/YearResultSlide4'
import YearResultSlide5 from './UI/YearResultSlide5/YearResultSlide5'
import YearResultSlide6 from './UI/YearResultSlide6/YearResultSlide6'
import YearResultSlide7 from './UI/YearResultSlide7/YearResultSlide7'
import YearResultSlide8 from './UI/YearResultSlide8/YearResultSlide8'
import YearResultSlide9 from './UI/YearResultSlide9/YearResultSlide9'
import { palette } from '@/shared/styles/unistyles'

const date = new Date()

export type PropsSlideYearResult = {
  item: DataYearsResultType
  index: number
  currentSlide: number
}

export type DataYearsResultType = {
  id: number
  title: string
  subtitle: string
  slide: (props: PropsSlideYearResult) => ReactNode
}

export const dataYearsResult: DataYearsResultType[] = [
  {
    id: 0,
    title: ``,
    subtitle: '',
    slide: (props: PropsSlideYearResult) => <YearResultSlide1 {...props} />,
  },
  {
    id: 1,
    title: ``,
    subtitle: '',
    slide: (props: PropsSlideYearResult) => <YearResultSlide2 {...props} />,
  },
  {
    id: 2,
    title: ``,
    subtitle: '',
    slide: (props: PropsSlideYearResult) => <YearResultSlide3 {...props} />,
  },
  {
    id: 3,
    title: ``,
    subtitle: '',
    slide: (props: PropsSlideYearResult) => <YearResultSlide4 {...props} />,
  },
  {
    id: 4,
    title: ``,
    subtitle: '',
    slide: (props: PropsSlideYearResult) => <YearResultSlide5 {...props} />,
  },
  {
    id: 5,
    title: ``,
    subtitle: '',
    slide: (props: PropsSlideYearResult) => <YearResultSlide6 {...props} />,
  },
  {
    id: 6,
    title: ``,
    subtitle: '',
    slide: (props: PropsSlideYearResult) => <YearResultSlide7 {...props} />,
  },
  {
    id: 7,
    title: ``,
    subtitle: '',
    slide: (props: PropsSlideYearResult) => <YearResultSlide8 {...props} />,
  },
  {
    id: 8,
    title: ``,
    subtitle: '',
    slide: (props: PropsSlideYearResult) => <YearResultSlide9 {...props} />,
  },
]

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
