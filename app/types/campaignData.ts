export type CampaignData = {
	characterData: {
		name: string;
		pronouns: string;
		age: string;
		race: string;
		class: string;
		armaments: string;
		apperance: string;


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
	  apperance: "",
	  backstory: "",
	  personality: "",
	  motivation: ""
  },
  storyData: {
	  title: "",
	  genre: "",
	  tone: "",
	  details: "",
	  hook: ""
  },
});