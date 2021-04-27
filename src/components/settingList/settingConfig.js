import { ExamDayIcon, ForwardIcon, MemberIcon, PersonIcon, ReviewIcon, ShopIcon, LockIcon, AboutUsIcon } from "../icons/icons";

export const profileSettings = [
  { title: "Choose a Exam Day", icon: ExamDayIcon, rightIcon: ForwardIcon, link: "chooseExamDay", disable: false },
  { title: "Manage Your Membership", icon: MemberIcon, rightIcon: ForwardIcon, link: "membership", disable: false },
  { title: "Reviews", icon: ReviewIcon, rightIcon: ForwardIcon, link: "reviews", disable: false },
  { title: "Visit Our Online Store", icon: ShopIcon, rightIcon: ForwardIcon, link: "shop", disable: false },
];

export const settings = [
  { title: "Change Password", icon: LockIcon,  rightIcon: null, link: '', disable: false},
  { title: "About Us", icon: AboutUsIcon, rightIcon: ForwardIcon, link: 'aboutUs', disable: false},
  { title: "About Us", icon: null, link: '', disable: true}
]