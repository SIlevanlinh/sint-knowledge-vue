import _ from 'lodash'

export const mapFields = (namespace, fields) => {
  return _.mapValues(fields, path => {
    return {
      get () {
        return _.get(this.$store.state[namespace], path)
      },
      set (value) {
        this.$store.commit(`${namespace}/updateField`, { path, value })
      }
    }
  })
}
