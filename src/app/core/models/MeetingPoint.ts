import { Manufacturer } from "./Manufacturer";

export type MeetingPoint = {
    uuid: string;
    name: string;
    location: {
        latitude: number;
        longitude: number;
    };
    manufacturerId: Manufacturer['uuid'];
    description?: string;
}

export type MeetingPointDB = {
    _id: string;
    name: string;
    location: {
        latitude: number;
        longitude: number;
    };
    manufacturerId: string;
    description?: string;
    isDeleted?: boolean;
}

export type AddMeetingPointDB = Omit<MeetingPointDB, '_id' | 'isDeleted'>;
export type UpdateMeetingPointDB = Omit<MeetingPointDB, '_id' | 'isDeleted'>;

export const mapMeetingPointToMeetingPoint = (meetingPointDB: MeetingPointDB): MeetingPoint => {
    return {
        uuid: meetingPointDB._id,
        name: meetingPointDB.name,
        location: meetingPointDB.location,
        manufacturerId: meetingPointDB.manufacturerId,
        description: meetingPointDB.description,
    };
}