import { ExamDayIcon, ForwardIcon, MemberIcon, PersonIcon, ReviewIcon, ShopIcon, LockIcon, AboutUsIcon, BellIcon, ShareIcon } from "../icons/icons";

export const profileSettings = [
  { title: "Study Plan", icon: ExamDayIcon, rightIcon: ForwardIcon, link: "stylePlan", disable: false },
  { title: "Review Questions", icon: ReviewIcon, rightIcon: ForwardIcon, link: "reviews", disable: false },
  { title: "Manage Your Membership", icon: MemberIcon, rightIcon: ForwardIcon, link: "membership", disable: false },
  { title: "Visit Our Online Store", icon: ShopIcon, rightIcon: null, link: "shop", disable: false },
];

export const settings = [
  { title: "Change Password", icon: LockIcon, rightIcon: ForwardIcon, link: 'changePasswordd', disable: false},
  { title: "Notification", icon: BellIcon, rightIcon: ForwardIcon, link: 'notification', disable: true},
  { title: "About Us", icon: AboutUsIcon, rightIcon: ForwardIcon, link: 'aboutUs', disable: false},
  { title: "Share Our App", icon: ShareIcon, rightIcon: null, link: 'share', disable: false},
]