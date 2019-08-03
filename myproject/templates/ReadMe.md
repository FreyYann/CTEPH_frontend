CURRENTLY IM LEAVING THE ITEM PAGE IN DEFAULT STATE
BUT IF YOU WANT TO GO AHEAD IM LEAVING THIS NOTE


IN THE ITEM.HTML
you can put the following code to process the information
and if you have problems we could fix it on Monday

The Thing I am not clear on is how I am going to interact the data from
the template in the post method.

I think you should use the input from the file to process the information
Then when the user goes to the next page they can click the button

from  jinja2 and get the information to update the template.








<!-- https://stackoverflow.com/questions/8624520/passing-a-variable-into-a-jinja-import-or-include-from-a-parent-html-file -->


{%for i in rangeX%}
{%if '.' in dirlist[i]%}
<li class="image__sub-item">
  <!-- class="image__sub-list" -->
  <ul class="image__list" >
    <li class="image__list-item">
      <!-- ../static/patient/{{dirlist[i]}} -->
      <img class="image__list-img" src="../static/patient/{{dirlist[i]}}" alt="subItems">
    </li>
    <li class="image__list-item">
      <!-- ../static/result/{{result[i]}} -->
      <img class="image__list-img" src="../static/result/{{result[i]}}" alt="subItems">
    </li>
  </ul>
</li>


{%endif%}
{%endfor%}
