// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.
export enum InsightsWidgetTypes {
    TOP_CHANNELS = 'TOP_CHANNELS',
    TOP_REACTIONS = 'TOP_REACTIONS',
}

export enum CardSizes {
    large = 'lg',
    medium = 'md',
    small = 'sm',
}
export type CardSize = CardSizes;

export enum TimeFrames {
    INSIGHTS_1_DAY = 'today',
    INSIGHTS_7_DAYS = '7_day',
    INSIGHTS_28_DAYS = '28_day',
}

export type TimeFrame = TimeFrames;

export type TopReaction = {
    emoji_name: string;
    count: number;
}

export type TopReactionResponse = {
    has_next: boolean;
    items: TopReaction[];
    timeFrame?: TimeFrame;
}

export type InsightsState = {
    topReactions: Record<string, Record<TimeFrame, Record<string, TopReaction>>>;
    myTopReactions: Record<TimeFrame, Record<string, TopReaction>>;
}