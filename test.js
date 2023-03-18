import ogp from 'ogp-parser'

const url = 'https://qiita.com/ohhara_shiojiri/items/47e4111a81431c7cb3a7'

console.log("URL:"+url)

const data = await ogp(url)
console.log(data)