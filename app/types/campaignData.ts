export type CampaignData = {
	characterData: {
		name: string;
	}
	storyData: {
		title: string;
	}
}

export const createDefaultCampaign = (): CampaignData => ({
  characterData: { name: "" },
  storyData: { title: "" },
});