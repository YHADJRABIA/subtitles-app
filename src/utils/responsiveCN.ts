import cn from 'classnames'
import { capitaliseFirstLetter } from './string'

export type ResponsiveValues<T> = T | [T | undefined, T, T?]

export type Breakpoint = 'Small' | 'Medium' | 'Large'

export const BREAKPOINT_NAMES: Breakpoint[] = ['Small', 'Medium', 'Large']

type CSSModule = {
  [key: string]: string
}

function buildClassName<T>(
  prefix: string,
  value: T,
  breakpointName?: Breakpoint
): string {
  let className = `${prefix}`

  if (typeof value === 'string') {
    className += capitaliseFirstLetter(value)
  }
  if (typeof value === 'number') {
    className += value.toString()
  }
  if (typeof breakpointName !== 'undefined') {
    className += breakpointName
  }
  return className
}

// Use-case: 0 is a value
const shouldEnableClassName = <T>(value: T): boolean => {
  if (value === 0) return true

  return !!value
}

export const responsiveCN =
  (styles: CSSModule) =>
  <T>(classNamePrefix: string, value?: ResponsiveValues<T>): string => {
    let classNames: string

    if (Array.isArray(value)) {
      classNames = cn(
        BREAKPOINT_NAMES.map((breakpointName, index) => {
          const breakpointValue = value[index]
          const className = buildClassName(
            classNamePrefix,
            breakpointValue,
            breakpointName
          )
          return { [styles[className]]: shouldEnableClassName(value[index]) }
        })
      )
    } else {
      const className = buildClassName(classNamePrefix, value)
      classNames = cn({
        [styles[className]]: shouldEnableClassName(value),
      })
    }

    return classNames
  }
