import stringRenderer from './string-renderer'

test('should render without options correctly', () => {
  const htmlData = `
  <html>
    <body>
      <div id="root"></div>
    </body>
  </html>
  `

  const str = '<div>Hello</div>'

  const req = {}
  const res = {
    send: jest.fn()
  }

  stringRenderer(req, res, str, htmlData, {})
  expect(res.send).toHaveBeenCalledWith(`
  <html>
    <body>
      <div id="root"><div>Hello</div></div>
    </body>
  </html>
  `)
})

test('should render correctly with onFinish', () => {
  const htmlData = `
  <html>
    <body>
      <div id="root"></div>
      <div id="script"></div>
    </body>
  </html>
  `

  const str = '<div>Hello</div>'

  const req = {}
  const res = {
    send: jest.fn()
  }

  stringRenderer(req, res, str, htmlData, {
    onFinish: (req1, res1, data) => {
      const finalHtml = data.replace(
        '<div id="script"></div>',
        '<script>window.hello=1</script>')
      res1.send(finalHtml)
    }
  })
  expect(res.send).toHaveBeenCalledWith(`
  <html>
    <body>
      <div id="root"><div>Hello</div></div>
      <script>window.hello=1</script>
    </body>
  </html>
  `)
})

test('should render correctly with onEndReplace', () => {
  const htmlData = `
  <html>
    <body>
      <div id="root"></div>
      <div id="script"></div>
    </body>
  </html>
  `

  const str = '<div>Hello</div>'

  const req = {}
  const res = {
    send: jest.fn()
  }

  stringRenderer(req, res, str, htmlData, {
    onEndReplace: (data) => {
      return data.replace(
        '<div id="script"></div>',
        '<script>window.hello=1</script>')
    }
  })
  expect(res.send).toHaveBeenCalledWith(`
  <html>
    <body>
      <div id="root"><div>Hello</div></div>
      <script>window.hello=1</script>
    </body>
  </html>
  `)
})
