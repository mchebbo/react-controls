import { keyframes } from 'typestyle';
import { NestedCSSProperties } from 'typestyle/lib/types';
import { LoadingIndicatorProps } from './UpLoadingIndicator';
import { WithThemeProps } from '../../../Common/theming/withTheme';
import { CSSProperties } from 'react';

 
const draw = keyframes({
  from: {
    transform: 'rotate(0deg)',
  },
  to: {
    transform: 'rotate(360deg)',
  },
});


export const svgStyle = (props: WithThemeProps): NestedCSSProperties => ({
  width: '48px',
  height: '48px',
  borderRadius: "24px",
  border: `5px solid rgba(245,145,0,0.60)`,
  borderTop: `5px solid ${props.theme.colorMap.primary}`,
  animation: `${draw} 2s infinite ease-in-out`,
})

export const getStyleByMode = (props: WithThemeProps & LoadingIndicatorProps , displayMode: String): {
  container: Object,
  overlay: Object,
  loadingIndicatorStyle: Object
} => {
  let container: CSSProperties
  let overlay: CSSProperties
  let loadingIndicatorStyle: CSSProperties

  const { isLoading, width, height, theme} = props
  if (displayMode === 'zone') {
    container = {
      position: "relative",
      display: "block"
    };

    overlay = {
      position: "absolute",
      left: 0,
      right: 0,
      top: 0,
      bottom: 0,
      backgroundColor: "rgba(0,0,0,0.4)",
      display: isLoading ? "block" : "none",
    }

    loadingIndicatorStyle = {
      position: 'absolute',
      left: `calc(50% - ${width / 2}px)`,
      top: `calc(50% - ${height ? height / 2 : 42}px)`,
      padding: 10,
      textAlign: 'center',
      width,
      height: height || 'auto',
      margin: 'auto',
      zIndex: 1000,
      backgroundColor: 'white',
      opacity: 1,
      borderRadius: theme.borderRadius,
      boxShadow: "1px 1px 3px 2px #111",
      display: 'flex',
      justifyContent: 'center'
    };

  } else {
    container = {
      position: "fixed",
      top: 0,
      right: 0,
      bottom: 0,
      left: 0,
      zIndex: 9999,
      backgroundColor: theme.colorMap.white1,
      opacity: 0.8
    }
    loadingIndicatorStyle = { minWidth: '300px' }

    if (displayMode === 'layer') {

      container = {
        ...container,
        backgroundColor :'transparent',
        opacity : 1,
      }
      loadingIndicatorStyle = {
        ...loadingIndicatorStyle,
        zIndex: 9999,
        backgroundColor : theme.colorMap.white1,
        opacity : 0.8 ,
        padding : 10,
        borderRadius : theme.borderRadius,
        boxShadow : '1px 1px 3px 2px #111',

      }
    }
  }
  return { container, overlay, loadingIndicatorStyle }
}
