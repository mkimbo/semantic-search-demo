import DentalLead from "./mongoose/dental-lead.js";
export default async (name: string) => {
  let leads: string[] = [];
  const doc = await DentalLead.findOne({ name: name });
  if (doc) {
    leads = doc.instagram_usernames;
  }
  return { success: true, currentLeads: leads };
};
