import { Message } from '../model/User'
export interface ApiResponse {
    success: boolean,
    message: string,
    isAccpecting?: boolean,
    messages?: Array<Message>
}