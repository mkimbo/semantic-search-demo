import DentalLead from "./mongoose/dental-lead.js";
export default async (leads: string[]) => {
  await DentalLead.findOneAndUpdate(
    { name: "schedlit" },
    { $push: { instagram_usernames: { $each: leads } } },
    { new: true }
  );

  //   const res = await DentalLead.create({
  //     instagram_usernames: newleads,
  //     name: "schedlit",
  //   });

  return { success: true };
};
