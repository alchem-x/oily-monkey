export default class Config {

    constructor({ id, name = '', pattern = '', description = '', url = '' }) {
        this.id = id
        this.name = name
        this.pattern = pattern
        this.description = description
        this.url = url
    }
}
