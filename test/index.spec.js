
const describe = require('mocha').describe
const it = require('mocha').it
const expect = require('chai').expect
const fs = require('fs')
const vueParser = require('../lib/index')

describe('Tests', function () {

  function writeFiles () {
    let contents = ''
    let parsed = ''

    contents = contents = fs.readFileSync('./test/test-lf.vue', 'utf8')
    parsed = vueParser.parse(contents, 'script', { lang: 'ts' })
    fs.writeFileSync('./test/test-lf-parsed.ts', parsed)

    contents = contents = fs.readFileSync('./test/test-crlf.vue', 'utf8')
    parsed = vueParser.parse(contents, 'script', { lang: 'ts' })
    fs.writeFileSync('./test/test-crlf-parsed.ts', parsed)

    contents = contents = fs.readFileSync('./test/test-no-above.vue', 'utf8')
    parsed = vueParser.parse(contents, 'script', { lang: 'ts' })
    fs.writeFileSync('./test/test-no-above-parsed.ts', parsed)    
  }

  //writeFiles()

  it('should work with LF line terminators', function () {
    const contents = fs.readFileSync('./test/test-lf.vue', 'utf8')
    const parsed = fs.readFileSync('./test/test-lf-parsed.ts', 'utf8')

    expect(contents.indexOf(";")).to.be.equal(parsed.indexOf(";"))
  })  

  it('should work with CRLF line terminators', function () {
    const contents = fs.readFileSync('./test/test-crlf.vue', 'utf8')
    const parsed = fs.readFileSync('./test/test-crlf-parsed.ts', 'utf8')

    expect(contents.indexOf(";")).to.be.equal(parsed.indexOf(";"))   
  })
  
  it('should work with no content above target tag', function () {
    const contents = fs.readFileSync('./test/test-no-above.vue', 'utf8')
    const parsed = fs.readFileSync('./test/test-no-above-parsed.ts', 'utf8')

    expect(contents.indexOf(";")).to.be.equal(parsed.indexOf(";"))   
  })

  it('should return empty string if no target tag found', function () {
    const contents = fs.readFileSync('./test/test-no-script.vue', 'utf8')
    const parsed = vueParser.parse(contents, 'script', { lang: 'ts', emptyExport: false })

    expect(parsed).to.be.empty   
  })

  it('should return empty export if no target script found', function () {
    const contents = fs.readFileSync('./test/test-no-script.vue', 'utf8')
    const parsed = vueParser.parse(contents, 'script', { lang: 'ts' })

    expect(parsed).to.be.equal('export default {}')   
  })

})
