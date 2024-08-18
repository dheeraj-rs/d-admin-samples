# Gradienticons

Tagline: Beautiful Gradient Icons for React

## Hero Section

Headline: Elevate Your React UI with Stunning Gradient Icons
Subheadline: Customizable, Flexible, and Easy to Use
Call-to-Action: Get Started Now

## Features

- 🎨 Support for solid colors and gradients
- 🖱️ Hover effects for colors and gradients
- 🔷 Multiple shape options (circle, square)
- 📏 Customizable size and padding
- 🔳 Background color and shape customization
- 💫 Box shadow and icon shadow effects
- 🔄 Flexible input handling for all props

## Icon Examples

[Note: Replace these with actual Gradienticons examples]

1. Home Icon
2. Search Icon
3. Settings Icon
4. User Icon
5. Mail Icon
6. Calendar Icon
7. Chart Icon
8. Document Icon

## Getting Started

### Installation

```bash
npm install gradienticons
```

or

```bash
yarn add gradienticons
```

### Basic Usage

```jsx
import React from 'react';
import { Icon } from 'gradienticons';

function App() {
  return (
    <div>
      <Icon
        name="home"
        size={50}
        gradientColors={['#ff00ff', '#00ffff']}
        shape="circle"
        backgroundColor="#f0f0f0"
      />
    </div>
  );
}

export default App;
```

## Customization Examples

[Note: Replace these with actual Gradienticons examples]

1. Gradient Icon
   Description: Smooth transition between two colors

2. Hover Effect Icon
   Description: Changes color or gradient on hover

3. Square Shape Icon
   Description: Icon with square background and custom border radius

4. Shadow Effect Icon
   Description: Icon with box shadow and inner shadow effects

5. Animated Icon
   Description: Icon with subtle animation on hover

## API Reference

| Prop                 | Type             | Default        | Description                              |
| -------------------- | ---------------- | -------------- | ---------------------------------------- |
| name                 | string           | -              | Name of the icon (required)              |
| size                 | string \| number | '1em'          | Size of the icon                         |
| color                | string           | 'currentColor' | Color of the icon                        |
| gradientColors       | array            | null           | Array of two colors for gradient         |
| hoverColor           | string           | null           | Color on hover                           |
| hoverGradientColors  | array            | null           | Gradient colors on hover                 |
| directionStart       | string           | 'topLeft'      | Start direction of gradient              |
| directionEnd         | string           | 'bottomRight'  | End direction of gradient                |
| opacity              | string \| number | 1              | Opacity of the icon                      |
| backgroundColor      | string           | 'transparent'  | Background color                         |
| hoverBackgroundColor | string           | null           | Background color on hover                |
| shape                | string           | 'circle'       | Shape of the icon ('circle' or 'square') |
| borderRadius         | string \| number | 0              | Border radius for square shape           |
| padding              | string \| number | 0              | Inner padding                            |
| outerPadding         | string \| number | 0              | Outer padding                            |
| boxShadow            | string           | null           | Box shadow CSS                           |
| iconShadow           | string           | null           | Icon shadow CSS                          |
| cursor               | string           | 'default'      | Cursor style                             |

## Advanced Usage Examples

### Gradient Icon with Hover Effect

```jsx
<Icon
  name="star"
  size={60}
  gradientColors={['#FFD700', '#FFA500']}
  hoverGradientColors={['#FFA500', '#FF4500']}
  shape="circle"
  boxShadow="0 4px 6px rgba(0, 0, 0, 0.1)"
/>
```

### Customized Square Icon

```jsx
<Icon
  name="settings"
  size={80}
  color="#4A90E2"
  hoverColor="#2E5A9C"
  shape="square"
  borderRadius={10}
  backgroundColor="#F0F0F0"
  hoverBackgroundColor="#E0E0E0"
  padding={5}
/>
```

### Icon with Shadow Effects

```jsx
<Icon
  name="bell"
  size={70}
  gradientColors={['#FF6B6B', '#FF8E53']}
  shape="circle"
  boxShadow="0 6px 12px rgba(0, 0, 0, 0.15)"
  iconShadow="2px 2px 3px rgba(0, 0, 0, 0.3)"
/>
```

## Why Choose Gradienticons?

1. Seamless React Integration: Designed specifically for React applications, ensuring smooth implementation and optimal performance.

2. Unlimited Customization: With support for gradients, hover effects, and various shapes, you can create unique icons that perfectly match your design.

3. Responsive and Flexible: Icons adapt to different sizes and resolutions, maintaining crisp quality across devices.

4. Performance Optimized: Lightweight implementation ensures your application remains fast and efficient.

5. Developer Friendly: Intuitive API and flexible input handling make it easy to create and modify icons on the fly.

## Testimonials

[Add 2-3 testimonials from developers or companies using Gradienticons]

## FAQ

1. Q: Can I use custom SVG paths with Gradienticons?
   A: Currently, Gradienticons uses a predefined set of icons. Custom SVG support is on our roadmap for future releases.

2. Q: Is Gradienticons compatible with server-side rendering (SSR)?
   A: Yes, Gradienticons is fully compatible with SSR frameworks like Next.js.

3. Q: Can I use Gradienticons with TypeScript?
   A: Absolutely! Gradienticons comes with built-in TypeScript definitions for a seamless development experience.

## Contributing

We welcome contributions to Gradienticons! If you'd like to contribute, please follow these steps:

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

Please make sure to update tests as appropriate and adhere to the existing coding style.

## Support and Community

- GitHub Issues: [Link to GitHub Issues]
- Discord Community: [Link to Discord]
- Twitter: [@GradientIcons]

## License

Gradienticons is open-source software licensed under the MIT license.

---

Created with ❤️ by [DHEERAJ]
