export const generateRandomLightColor = () => {
  // 生成随机的 R、G、B 值（128-255 的范围）
  const red = Math.floor(Math.random() * 128) + 128
  const green = Math.floor(Math.random() * 128) + 128
  const blue = Math.floor(Math.random() * 128) + 128

  // 将 RGB 值转换为十六进制字符串
  const hex = `#${red.toString(16).padStart(2, '0')}${green
      .toString(16)
      .padStart(2, '0')}${blue.toString(16).padStart(2, '0')}`

  return hex
}

export function generateColor() {
  const randomColor = getRandomColor();
  // applyColor(randomColor);
  return randomColor
}

// 应用颜色到背景
function applyColor(color) {
  document.getElementById('colorBox').style.backgroundColor = color;
}

// 获取随机颜色
function getRandomColor() {
  const r = getRandomValue();
  const g = getRandomValue();
  const b = getRandomValue();
  return `rgb(${r}, ${g}, ${b})`;
}

// 获取 0 到 255 之间的随机整数
function getRandomValue() {
  return Math.floor(Math.random() * 256);
}

// 调整颜色的分量
export function adjustColor(currentColor, deltaR, deltaG, deltaB) {
  const rgbValues = currentColor.match(/\d+/g);
  const r = parseInt(rgbValues[0]) + deltaR;
  const g = parseInt(rgbValues[1]) + deltaG;
  const b = parseInt(rgbValues[2]) + deltaB;
  const adjustedColor = `rgb(${clamp(r)}, ${clamp(g)}, ${clamp(b)})`;
  return adjustedColor
}

// 限制颜色分量的范围在 0 到 255 之间
function clamp(value) {
  return Math.min(Math.max(0, value), 255);
}