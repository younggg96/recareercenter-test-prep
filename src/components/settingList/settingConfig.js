import { ExamDayIcon, ForwardIcon, MemberIcon, PersonIcon, ReviewIcon, ShopIcon, LockIcon, AboutUsIcon, BellIcon, ShareIcon, ContactUsIcon, BookIcon, GiftIcon, ShareNormalIcon, HeadphonesIcon, tvIcon } from "../icons/icons";

export const profileSettings = [
  { title: "Study Plan", icon: ExamDayIcon, rightIcon: ForwardIcon, link: "StudyPlanScreen", disable: false },
  { title: "Review Questions", icon: ReviewIcon, rightIcon: ForwardIcon, link: "ReviewsScreen", disable: false },
  { title: "Manage Your Membership", icon: MemberIcon, rightIcon: ForwardIcon, link: "MembershipScreen", disable: false },
];

export const viewOurWebsite = [
  { title: "Visit Our Online Store", icon: ShopIcon, rightIcon: ForwardIcon, disable: false, url: "https://www.recareercenter.com"},
  { title: "National Classes", icon: BookIcon, rightIcon: ForwardIcon, disable: false, url: "https://www.recareercenter.com/national/" },
  { title: "Shop at Our Book Store", icon: BookIcon, rightIcon: ForwardIcon, disable: false, url: "https://www.recareercenter.com/product-category/books/" },
  { title: "Check Out Our Merch Store", icon: GiftIcon, rightIcon: ForwardIcon, disable: false, url: "https://www.recareercenter.com/product-category/merch-store/" },
];

export const additionalStudentsResources = [
  { title: "Class Schedule", icon: null, rightIcon: ForwardIcon, disable: false, url: "https://www.recareercenter.com/schedule"},
  { title: "Testing Information", icon: null, rightIcon: ForwardIcon, disable: false, url: "https://www.recareercenter.com/test" },
  { title: "Directions After Passing School Exam", icon: null, rightIcon: ForwardIcon, disable: false, url: "https://www.recareercenter.com/congrats" },
  { title: "Student Information Form", icon: null, rightIcon: ForwardIcon, disable: false, url: "https://www.recareercenter.com/studentinfo" },
  { title: "Fingerprinting Process", icon: null, rightIcon: ForwardIcon, disable: false, url: "https://www.state.nj.us/dobi/division_rec/licensing/fingerprint.html" },
  { title: "Get My Official Transcript", icon: null, rightIcon: ForwardIcon, disable: false, url: "https://www.recareercenter.com/product/transcript" },
];

export const podcast = [
  { title: "Watch our Podcast", icon: tvIcon, rightIcon: ForwardIcon, disable: false, url: "https://www.youtube.com/channel/UC8VUdmsfNgDOPPqL0twrG0A"},
  { title: "Listen to our Podcast", icon: HeadphonesIcon, rightIcon: ForwardIcon, disable: false, url: "https://open.spotify.com/show/7Det2fyr9eaw7xnXE2a4da/" },
];

export const settings = [
  // { title: "Change Password", icon: LockIcon, rightIcon: ForwardIcon, link: 'ChangePasswordScreen', disable: false},
  { title: "Study Alarm", icon: BellIcon, rightIcon: ForwardIcon, link: 'NotificationScreen', disable: false},
  { title: "About Us", icon: AboutUsIcon, rightIcon: ForwardIcon, link: 'AboutUsScreen', disable: false},
  // { title: "Contact Us", icon: ContactUsIcon, rightIcon: null, link: null, disable: false},
  { title: "Share Our App", icon: ShareNormalIcon, rightIcon: null, link: null, disable: false},
]