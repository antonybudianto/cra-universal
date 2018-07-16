import { getInitialData } from './index'

test('should success without any loadData', (done) => {
  const ctx = {
    req: {
      path: '/'
    }
  }
  const store = {}
  const TestComp = function () {
    return null
  }
  const routes = [
    {
      component: TestComp
    }
  ]
  const prom = getInitialData(ctx, store, routes)
  .then(result => {
    expect(result.length).toBe(0)
    done()
  })
})

test('should filter route with loadData', (done) => {
  const ctx = {
    req: {
      path: '/'
    }
  }
  const store = {}
  const TestComp = function () {
    return null
  }
  TestComp.loadData = jest.fn()
  const routes = [
    {
      component: TestComp
    },
    {
      component: () => {}
    }
  ]
  const prom = getInitialData(ctx, store, routes)
  .then(result => {
    expect(result.length).toBe(1)
    expect(TestComp.loadData).toHaveBeenCalled()
    done()
  })
})
