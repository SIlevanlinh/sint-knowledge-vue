const increase = key => state => { state[key]++ }

const set = key => (state, val) => { state[key] = val }

export default {
  increase,
  set
}