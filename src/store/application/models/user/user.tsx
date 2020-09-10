import { JsonUtils } from '../../utils/json.util'

export enum UserTypes {
    ADMIN = 'admin',
    TEACHER = 'teacher',
    TUTOR = 'tutor',
    STUDENT = 'student'
}

export default class User {
    private _id: string | undefined
    private _created_at: string | undefined
    private _name: string | undefined
    private _email: string | undefined
    private _password: string | undefined
    private _type: UserTypes | undefined
    private _gamePoints: number | undefined
    private _notes: number[] | undefined

    constructor() {
        this._id = ''
        this._created_at = ''
        this._name = ''
        this._email = ''
        this._password = ''
        this._type = '' as UserTypes
        this._notes = []
    }

    get id(): string | undefined {
        return this._id
    }

    set id(value: string | undefined) {
        this._id = value
    }

    get created_at(): string | undefined {
        return this._created_at
    }

    set created_at(value: string | undefined) {
        this._created_at = value
    }

    get name(): string | undefined {
        return this._name
    }

    set name(value: string | undefined) {
        this._name = value
    }


    get email(): string | undefined {
        return this._email
    }

    set email(value: string | undefined) {
        this._email = value
    }

    get password(): string | undefined {
        return this._password
    }

    set password(value: string | undefined) {
        this._password = value
    }

    get type(): UserTypes | undefined {
        return this._type
    }

    set type(value: UserTypes | undefined) {
        this._type = value
    }

    get gamePoints(): number | undefined {
        return this._gamePoints
    }

    set gamePoints(value: number | undefined) {
        this._gamePoints = value
    }

    get notes(): number[] | undefined {
        return this._notes
    }

    set notes(value: number[] | undefined) {
        this._notes = value
    }

    public fromJSON(json: any): User {
        if (!json) {
            return this
        }
        if (typeof json === 'string') {
            if (!JsonUtils.isJSONString(json)) {
                return this
            }
            json = JSON.parse(json)
        }

        if (json.id !== undefined) {
            this._id = json.id
        }

        if (json.created_at !== undefined) {
            this._created_at = json.created_at
        }

        if (json.name !== undefined) {
            this._name = json.name
        }

        if (json.email !== undefined) {
            this._email = json.email
        }

        if (json.password !== undefined) {
            this._password = json.password
        }

        if (json.type !== undefined) {
            this._type = json.type
        }

        if (json.gamePoints !== undefined) {
            this._gamePoints = json.gamePoints
        }

        if (json.notes !== undefined) {
            this._notes = json.notes
        }

        return this
    }

    public toJSON(): any {
        return {
            id: this.id ? this.id : undefined,
            created_at: this.created_at ? this.created_at : undefined,
            name: this.name ? this.name : undefined,
            email: this.email ? this.email : undefined,
            password: this.password ? this.password : undefined,
            type: this.type ? this.type : undefined,
            gamePoints: this.gamePoints ? this.gamePoints : undefined,
            notes: this.notes ? this.notes : undefined
        }
    }
}
