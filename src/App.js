import React, { Component, Fragment } from 'react'
import { DebounceInput } from 'react-debounce-input'
import Emoji from './components/Emoji'
import Header from './components/Header'
import Footer from './components/Footer'
import Toast from './components/Toast'
import Loading from './components/Loading'
import qs from 'query-string'

const TEXT_AREA_HEIGHT = 12
const DEBOUNCE_TIMEOUT = 250
const defaultKeys = {
  x: '🌀',
  y: '🍉',
}

class App extends Component {

  constructor(props){
    super(props)
    this.encodedRef = React.createRef()
    this.decodedRef = React.createRef()
    const parsed = { ...defaultKeys, ...qs.parse(window.location.search) }
    this.state = {
      input: '',
      output: '',
      key1: parsed.x,
      key2: parsed.y,
      toast: false,
      loading: false,
    }
    this.emoji = new Emoji({
      characters: [
        this.state.key1,
        this.state.key2,
        '\n'
      ]
    })
    this.updateQuery()
  }

  updateQuery = () => {
    const { key1, key2 } = this.state
    const { history } = window
    if (history.pushState) {
      const newURL = new URL(window.location.href)
      newURL.search = qs.stringify({x: key1, y: key2 })
      window.history.pushState({ path: newURL.href }, '', newURL.href)
    }
  }

  handleChange = key => ({target}) => {
    const state = { ...this.state }
    state[key] = target.value
    state.loading = false
    if (key === 'input') {
      state.output = this.emoji.encode(target.value)
    } else {
      state.input = this.emoji.decode(target.value)
    }
    this.setState(state)
  }

  handleSelect = id => emoji => {
    const { state } = this;
    this.emoji.setCharacter(id, emoji.native)
    state[`key${id+1}`] = emoji.native
    state.output = this.emoji.encode(state.input)
    this.setState(state, this.updateQuery)
  }

  handleCopy = ref => () => {
    const textarea = this[ref].current
    textarea.select()
    document.execCommand('copy')
    this.handleToast(true)()
    setTimeout(this.handleToast(false), 5 * 1000)
  }

  handleToast = toast => () => {
    this.setState({
      toast
    })
  }

  render() {
    const { input, output, toast, loading } = this.state
    const { characters } = this.emoji.state
    return (
      <Fragment>
        <Header
          loading={loading}
          handleSelect={this.handleSelect}
          characters={characters}
        />
        <section className='section is-hidden-touch has-padding'>
          <div className="container">
            <ul id='steps'>
              <li>Choose your <strong>emoji keys</strong> to encode/decode with above</li>
              <li>Type or Paste your <strong>message</strong> to encode/decode below</li>
              <li>Share your message with a friend. {`🍻`}</li>
            </ul>
          </div>
        </section>
        <section id="content" className="section">
          <div className="container has-padding">
            <div className="columns">
              <div className="column">
                <button
                  className='button is-info is-radiusless is-pulled-right is-small'
                  onClick={this.handleCopy('decodedRef')}
                >
                  COPY
                </button>
                <label className='label is-small'><span className="is-hidden-touch">DECODED</span> MESSAGE</label>
                <DebounceInput
                  debounceTimeout={DEBOUNCE_TIMEOUT}
                  element='textarea'
                  inputRef={this.decodedRef}
                  forceNotifyByEnter={false}
                  id="encode"
                  className="textarea is-large is-shadowless is-radiusless"
                  rows={TEXT_AREA_HEIGHT}
                  onChange={this.handleChange('input')}
                  value={input}
                  autoComplete="off"
                  autoCorrect="off"
                  autoCapitalize="off"
                  spellCheck="false"
                />
              </div>
              <div className="column">
                <button
                  className='button is-info is-radiusless is-pulled-right is-small'
                  onClick={this.handleCopy('encodedRef')}
                >
                  COPY
                </button>
                <label className='label is-small'>ENCODED MESSAGE</label>
                <DebounceInput
                  debounceTimeout={DEBOUNCE_TIMEOUT}
                  element='textarea'
                  inputRef={this.encodedRef}
                  id="decode"
                  className="textarea is-large is-shadowless is-radiusless"
                  rows={TEXT_AREA_HEIGHT}
                  onChange={this.handleChange('output')}
                  value={output}
                  autoComplete="off"
                  autoCorrect="off"
                  autoCapitalize="off"
                  spellCheck="false"
                />
              </div>
            </div>
          </div>
        </section>
        <Footer />
        <Loading active={loading} />
        <Toast
          key={'toasty'}
          active={toast}
          delay={8}
        >
          <strong> Message Copied! </strong>
        </Toast>
      </Fragment>
    );
  }
}

export default App;
