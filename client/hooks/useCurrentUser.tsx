import { Meteor } from "meteor/meteor";
import { useTracker } from "meteor/react-meteor-data";

export const useCurrentUser = () => {
  const user = useTracker(() => {
    return Meteor.user();
  });

  return {
    user,
  };
};
