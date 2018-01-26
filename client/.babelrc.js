module.exports = {
  "presets": [
    ["@babel/env", {
      "targets": {
        "browsers": ["last 2 versions"]
      },
      "modules": false
    }],
    "@babel/stage-1"
  ],
  "plugins": [
    "@babel/transform-react-display-name",
    ["@babel/transform-react-jsx", {
      "useBuiltIns": true
    }],
    "@babel/transform-react-jsx-self",
    "@babel/transform-react-jsx-source"
  ]
}
