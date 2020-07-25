export class User {
    constructor(
       private id: string,
       private name: string,
       private nickname: string,
        private email: string
    ) {}

    public getId(): string {
        return this.id;
    }
    
    public getName(): string | undefined {
        return this.name;
    }
    
    public getNickname(): string | undefined {
        return this.nickname;
    }
    
    public getEmail(): string | undefined {
        return this.email;
    }

    public setName(name: string): void {
        this.name = name
    }

    public setNickname(nickname: string): void {
        this.nickname = nickname
    }

    public setEmail(email: string): void {
        this.email = email
    }
} 