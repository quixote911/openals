import {ISessionRepository, Session} from "../domain/session";
import {InternetSessionRepository} from "../infrastructure/impl/session/internet-session-repository";


export class SecureContext {
    private sessionRepo: ISessionRepository;
    constructor(selfCredentials: unknown) {
        this.sessionRepo = new InternetSessionRepository(selfCredentials);
    }
    public getSession = async (counterpartyId: string): Promise<Session> => {
        return this.sessionRepo.getOrCreate(counterpartyId);
    }
    public processIncoming = async (senderId: string, message: unknown): Promise<unknown> => {
        const session: Session = await this.sessionRepo.getOrCreate(senderId)
        return session.processIncoming(message);
    }
    public processOutgoing = async (recipientId: string, message: unknown): Promise<unknown> => {
        const session: Session = await this.sessionRepo.getOrCreate(recipientId)
        return session.processOutgoing(message);
    }

}




