import _ from 'lodash'

class Puzzle {

    constructor(answerCountry, fakeCountries) {
        this.answerCountry = answerCountry
        fakeCountries.push(answerCountry)
        this.options = _.shuffle(fakeCountries)
        console.log(this.options)
    }
  
    checkAnswer (country) {
        return country == this.answerCountry
    }
  
}

export default Puzzle
