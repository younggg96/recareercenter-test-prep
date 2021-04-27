import { ExamDayIcon, ForwardIcon, MemberIcon, PersonIcon, ReviewIcon, ShopIcon, LockIcon, AboutUsIcon, BellIcon, ShareIcon } from "../icons/icons";

export const profileSettings = [
  { title: "Study Plan", icon: ExamDayIcon, rightIcon: ForwardIcon, link: "StudyPlanScreen", disable: false },
  { title: "Review Questions", icon: ReviewIcon, rightIcon: ForwardIcon, link: "ReviewsScreen", disable: false },
  { title: "Manage Your Membership", icon: MemberIcon, rightIcon: ForwardIcon, link: "MembershipScreen", disable: false },
  { title: "Visit Our Online Store", icon: ShopIcon, rightIcon: null, disable: false },
];

export const settings = [
  { title: "Change Password", icon: LockIcon, rightIcon: ForwardIcon, link: 'ChangePasswordScreen', disable: false},
  { title: "Notification", icon: BellIcon, rightIcon: ForwardIcon, link: 'NotificationScreen', disable: false},
  { title: "About Us", icon: AboutUsIcon, rightIcon: ForwardIcon, link: 'AboutUsScreen', disable: false},
  { title: "Share Our App", icon: ShareIcon, rightIcon: null, link: 'Share', disable: true},
]