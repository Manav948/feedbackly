import { Message } from '../model/User'
export interface ApiResponse {
    success: boolean,
    message: string,
    isActive?: boolean,
    messages?: Array<Message>
}