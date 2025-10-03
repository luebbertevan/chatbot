export type CampaignData = {
	characterData: {
		name: string;
		pronouns: string;
		age: string;
		race: string;
		class: string;
		armaments: string;
		appearance: string;
		abilities: string;

		backstory: string;
		personality: string
		motivation: string;
	}
	storyData: {
		title: string;
		genre: string;
		tone: string;
		details: string;
		hook: string;
		
	}
}

export const createDefaultCampaign = (): CampaignData => ({
  characterData: {
	  name: "",
	  pronouns: "",
	  age: "",
	  race: "",
	  class: "",
	  armaments: "",
	  appearance: "",
	  backstory: "",
	  personality: "",
	  motivation: "",
	  abilities: ""
  },
  storyData: {
	  title: "",
	  genre: "",
	  tone: "",
	  details: "",
	  hook: ""
  },
});