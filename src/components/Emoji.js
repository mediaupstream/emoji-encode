const encode_utf8 = s => unescape(encodeURIComponent(s))
const decode_utf8 = s => decodeURIComponent(escape(s))

export default class Emoji {
  state = {
    characters: ['🌀', '🍉', '\n'],
    results: '',
    raw: []
  }

  constructor(options = {}) {
    let state = {...this.state, ...options}
    state.characters = state.characters.map(i => i)
    this.state = {...state}
  }

  setCharacter = (id, val) => {
    const { characters } = this.state
    characters[id] = val
    this.setState({
      characters
    })
  }

  setState = s => {
    this.state = {...this.state, ...s}
  }

  get = key => decode_utf8(this[key])
  set = (key, val) => {
    this[key] = encode_utf8(val)
  }

  decode = str => {
    const { characters } = this.state
    const c1 = characters[0]
    const c2 = characters[1]
    const end = characters[2]

    // ensure we can end
    if (str.indexOf(end) === -1) str += end

    let r = []
    let curr = 0
    const slen = str.length
    const l1 = parseInt(c1.length, 10)
    const l2 = parseInt(c2.length, 10)

    for(let j=0; j<=slen; j++){
      let tmp = 0;
      for(let i=7; i>=0; i--){
        if(str.slice(curr, (curr+l2)) === c2){
          curr += l2
        } else if (str.slice(curr, (curr+l1)) === c1){
          tmp = tmp | (Math.pow(2, i))
          curr += l1
        }
      }
      if(tmp) r.push(String.fromCharCode(tmp))
    }
    let results
    try {
      results = decode_utf8(r.join(''))
      this.results = results
      this.raw = r

    } catch(err) {
      // ope!
    }
    return results
  }

  encode = (str = '') => {
    const { end, characters } = this.state
    let results
    let r = []
    try {
      str = encode_utf8(str)
      for(let i=0; i<str.length; i++){
        for(let j=7; j>=0; j--){
          if(str.charCodeAt(i) & (Math.pow(2,j))){
            r.push(characters[0])
          } else {
            r.push(characters[1])
          }
        }
      }
      r.push(end)
      results = decode_utf8( r.join('') );
      this.results = results
      this.raw = r;
    } catch(err) {
      // ope!
      results = r.join('')
    }
    return results
  }

}
