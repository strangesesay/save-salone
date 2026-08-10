import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-about',
  imports: [RouterLink],
  templateUrl: './about.html',
  styleUrl: './about.scss',
})
export class About {

   pillars = [
    {
      icon: 'bi-mortarboard-fill',
      title: 'Education',
      description:
        'Promoting access to quality education, literacy, skills development and opportunities for lifelong learning.'
    },
    {
      icon: 'bi-tree-fill',
      title: 'Environment',
      description:
        'Supporting environmental protection, climate awareness, conservation and sustainable community practices.'
    },
    {
      icon: 'bi-flower1',
      title: 'Agriculture',
      description:
        'Strengthening sustainable agriculture, food security, livelihoods and opportunities for rural communities.'
    },
    {
      icon: 'bi-heart-pulse-fill',
      title: 'Health',
      description:
        'Promoting health awareness, prevention, access to information and healthier communities.'
    },
    {
      icon: 'bi-shield-check',
      title: 'Human Rights & Legal Education',
      description:
        'Promoting human rights awareness, legal education, equality, justice and access to essential information.'
    }
  ];


  values = [
    {
      icon: 'bi-people-fill',
      title: 'Community First',
      description:
        'We put the needs, dignity and aspirations of communities at the centre of our work.'
    },
    {
      icon: 'bi-shield-check',
      title: 'Integrity',
      description:
        'We operate with honesty, accountability, transparency and responsible stewardship.'
    },
    {
      icon: 'bi-lightbulb-fill',
      title: 'Innovation',
      description:
        'We embrace practical ideas and innovative approaches to address community challenges.'
    },
    {
      icon: 'bi-hand-thumbs-up-fill',
      title: 'Inclusion',
      description:
        'We believe every person deserves to participate, be heard and have equal opportunities.'
    },
    {
      icon: 'bi-arrow-repeat',
      title: 'Sustainability',
      description:
        'We pursue solutions that create lasting benefits for people, communities and the environment.'
    },
    {
      icon: 'bi-people',
      title: 'Partnership',
      description:
        'We collaborate with communities, institutions, government, civil society and development partners.'
    }
  ];

}
