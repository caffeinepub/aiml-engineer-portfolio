import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface Message {
    name: string;
    email: string;
    message: string;
    timestamp: Time;
}
export interface FAQEntry {
    question: string;
    answer: string;
}
export type Time = bigint;
export interface backendInterface {
    addFAQEntry(question: string, answer: string): Promise<void>;
    addInitialFAQEntries(): Promise<void>;
    getAllFAQEntries(): Promise<Array<FAQEntry>>;
    getFAQAnswer(keyword: string): Promise<string | null>;
    getMessages(): Promise<Array<Message>>;
    getVisitorCount(): Promise<bigint>;
    incrementVisitorCount(): Promise<bigint>;
    submitMessage(name: string, email: string, message: string): Promise<void>;
}
